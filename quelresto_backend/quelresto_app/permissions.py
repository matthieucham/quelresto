from rest_framework import permissions


class IsMasterOrNoShuffle(permissions.BasePermission):
    """
    Custom permission to only allow the master to shuffle the selection
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.path.endswith('shuffle') or request.path.endswith('shuffle/'):
            return obj.master == request.participant
        return True


class IsRecognized(permissions.BasePermission):
    """
    Custom permission to ensure that the participant request object has been set.
    """
    def has_permission(self, request, view):
        return request.participant is not None