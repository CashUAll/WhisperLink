using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WhisperLink.BusinessLayer.Core.Interfaces;
using WhisperLink.DataAccess.Context;
using WhisperLink.Domain.Entities;
using WhisperLink.Domain.Enums;
using WhisperLink.Domain.Models.Messages;
using WhisperLink.Domain.Models.Users;

namespace WhisperLink.BusinessLayer.Core.Actions
{
    // Logica business pentru messaging
    public class MessageActions : IMessageAction
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public MessageActions(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Send message - trimite mesaj nou
        public async Task<MessageDto?> SendMessageAsync(int senderId, SendMessageDto sendMessageDto)
        {
            // Verifică că receiver există
            var receiverExists = await _context.Users.AnyAsync(u => u.Id == sendMessageDto.ReceiverId);
            if (!receiverExists) return null;

            // Nu trimiți la tine însuți
            if (senderId == sendMessageDto.ReceiverId) return null;

            // Creează mesaj
            var message = new Message
            {
                SenderId = senderId,
                ReceiverId = sendMessageDto.ReceiverId,
                Content = sendMessageDto.Content,
                Status = MessageStatus.Sent,
                CreatedAt = DateTime.UtcNow
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            // Încarcă sender și receiver pentru DTO
            var messageWithUsers = await _context.Messages
                .Include(m => m.Sender)
                .Include(m => m.Receiver)
                .FirstOrDefaultAsync(m => m.Id == message.Id);

            return _mapper.Map<MessageDto>(messageWithUsers);
        }

        // Get conversations - lista de chat-uri cu ultimul mesaj și unread count
        public async Task<IEnumerable<ConversationDto>> GetConversationsAsync(int userId)
        {
            // Toate mesajele user-ului
            var messages = await _context.Messages
                .Include(m => m.Sender)
                .Include(m => m.Receiver)
                .Where(m => m.SenderId == userId || m.ReceiverId == userId)
                .OrderByDescending(m => m.CreatedAt)
                .ToListAsync();

            // Grupare după "cealaltă persoană"
            var conversations = messages
                .GroupBy(m => m.SenderId == userId ? m.ReceiverId : m.SenderId)
                .Select(group =>
                {
                    var lastMessage = group.First();
                    var unreadCount = group.Count(m => m.ReceiverId == userId && m.Status != MessageStatus.Read);
                    var otherUser = lastMessage.SenderId == userId ? lastMessage.Receiver : lastMessage.Sender;

                    return new ConversationDto
                    {
                        User = _mapper.Map<UserDto>(otherUser),
                        LastMessage = _mapper.Map<MessageDto>(lastMessage),
                        UnreadCount = unreadCount
                    };
                })
                .OrderByDescending(c => c.LastMessage.CreatedAt)
                .ToList();

            return conversations;
        }

        // Get conversation with user - toate mesajele cu o persoană
        public async Task<IEnumerable<MessageDto>> GetConversationWithUserAsync(int userId, int otherUserId)
        {
            var messages = await _context.Messages
                .Include(m => m.Sender)
                .Include(m => m.Receiver)
                .Where(m =>
                    (m.SenderId == userId && m.ReceiverId == otherUserId) ||
                    (m.SenderId == otherUserId && m.ReceiverId == userId)
                )
                .OrderBy(m => m.CreatedAt)
                .ToListAsync();

            return _mapper.Map<List<MessageDto>>(messages);
        }

        // Mark message as read - confirmă citirea
        public async Task<bool> MarkMessageAsReadAsync(int messageId, int userId)
        {
            var message = await _context.Messages.FirstOrDefaultAsync(m => m.Id == messageId);
            if (message == null) return false;

            // Doar receiver-ul poate marca ca citit
            if (message.ReceiverId != userId) return false;

            // Deja citit
            if (message.Status == MessageStatus.Read) return true;

            message.Status = MessageStatus.Read;
            message.ReadAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return true;
        }

        // Delete message - șterge mesaj
        public async Task<bool> DeleteMessageAsync(int messageId, int userId)
        {
            var message = await _context.Messages.FirstOrDefaultAsync(m => m.Id == messageId);
            if (message == null) return false;

            // Doar sender-ul poate șterge
            if (message.SenderId != userId) return false;

            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}