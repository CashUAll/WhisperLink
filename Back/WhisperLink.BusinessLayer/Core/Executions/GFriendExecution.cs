using System.Collections.Generic;
using System.Threading.Tasks;
using WhisperLink.BusinessLayer.Core.Interfaces;
using WhisperLink.Domain.Models.Friends;

namespace WhisperLink.BusinessLayer.Core.Executions
{
    // Orchestrare pentru FriendActions
    public class FriendExecution
    {
        private readonly IFriendAction _friendAction;

        public FriendExecution(IFriendAction friendAction)
        {
            _friendAction = friendAction;
        }

        // Send friend request - wrapper simplu
        public async Task<FriendshipDto?> SendFriendRequestAsync(int requesterId, SendFriendRequestDto requestDto)
        {
            return await _friendAction.SendFriendRequestAsync(requesterId, requestDto);
        }

        // Accept friend request - wrapper simplu
        public async Task<FriendshipDto?> AcceptFriendRequestAsync(int friendshipId, int userId)
        {
            return await _friendAction.AcceptFriendRequestAsync(friendshipId, userId);
        }

        // Reject friend request - wrapper simplu
        public async Task<bool> RejectFriendRequestAsync(int friendshipId, int userId)
        {
            return await _friendAction.RejectFriendRequestAsync(friendshipId, userId);
        }

        // Get friends - wrapper simplu
        public async Task<IEnumerable<FriendshipDto>> GetFriendsAsync(int userId)
        {
            return await _friendAction.GetFriendsAsync(userId);
        }

        // Get pending requests - wrapper simplu
        public async Task<IEnumerable<FriendshipDto>> GetPendingRequestsAsync(int userId)
        {
            return await _friendAction.GetPendingRequestsAsync(userId);
        }

        // Remove friend - wrapper simplu
        public async Task<bool> RemoveFriendAsync(int friendshipId, int userId)
        {
            return await _friendAction.RemoveFriendAsync(friendshipId, userId);
        }

        // Block user - wrapper simplu
        public async Task<bool> BlockUserAsync(int friendshipId, int userId)
        {
            return await _friendAction.BlockUserAsync(friendshipId, userId);
        }
    }
}