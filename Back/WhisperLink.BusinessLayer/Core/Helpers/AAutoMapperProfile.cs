using AutoMapper;
using WhisperLink.Domain.Entities;
using WhisperLink.Domain.Models.Friends;
using WhisperLink.Domain.Models.Messages;
using WhisperLink.Domain.Models.Users;

namespace WhisperLink.BusinessLayer.Core.Helpers
{
    // Configurare AutoMapper - conversii automate Entity ↔ DTO
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // User mappings
            CreateMap<User, UserDto>();
            CreateMap<RegisterDto, User>();
            CreateMap<UpdateUserDto, User>();

            // Message mappings
            CreateMap<Message, MessageDto>();
            CreateMap<SendMessageDto, Message>();

            // Friendship mappings
            CreateMap<Friendship, FriendshipDto>();
            CreateMap<SendFriendRequestDto, Friendship>();
        }
    }
}