import { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  UserIcon,
  Shield,
  ShieldAlert,
} from "lucide-react";
import { useData } from "../contexts/data-context";
import { useAuth } from "../contexts/auth-context";
import { SimpleCard } from "../components/base/card";
import { Button } from "../components/base/button";
import { Badge } from "../components/base/badge";
import { Modal } from "../components/base/modal";
import { IconCard } from "../components/icon-card";
import { cn, formatRelativeTime } from "../utils";
import { UserForm } from "../components/forms/user-form";
import { toast } from "sonner";

export const UsersPage = () => {
  const { users, addUser, updateUser, deleteUser } = useData();
  const { user: currentUser } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (user = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleFormSubmit = (value) => {
    if (editingUser) {
      const result = updateUser(editingUser.id, value);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("User updated successfully");
    } else {
      const result = addUser(value);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("User added successfully");
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    const result = deleteUser(id);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success("User deleted successfully");
    setDeleteConfirm(null);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "Admin":
        return ShieldAlert;
      case "Manager":
        return Shield;
      default:
        return UserIcon;
    }
  };

  return (
    <>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primaryColor-500/50 focus:border-primaryColor-500"
        />
      </div>

      <SimpleCard
        title={"Users"}
        asideComponent={
          <Button onClick={() => handleOpenModal()}>
            <Plus className="size-4" />
            Add User
          </Button>
        }
      >
        <div className="overflow-x-auto min-w-0">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-sm font-medium text-muted-foreground">
                  User
                </th>
                <th className="px-4 py-3 text-sm font-medium text-muted-foreground">
                  Role
                </th>
                <th className="px-4 py-3 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-sm font-medium text-muted-foreground">
                  Last Login
                </th>
                <th className="px-4 py-3 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    {searchQuery
                      ? "No users found matching your search."
                      : "No users yet."}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const RoleIcon = getRoleIcon(user.role);
                  const isCurrentUser = user.id === currentUser?.id;

                  return (
                    <tr
                      key={user.id}
                      className={cn(
                        "border-b transition-colors hover:bg-muted/30",
                        isCurrentUser && "bg-primaryColor-50/30"
                      )}
                    >
                      <td className="px-4 py-3">
                        <div className="flex gap-3 items-center">
                          <IconCard
                            icon={RoleIcon}
                            variant={
                              user.role === "Admin"
                                ? "accent"
                                : user.role === "Manager"
                                ? "primary"
                                : "default"
                            }
                            className="rounded-full shrink-0"
                          />
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground flex items-center gap-2">
                              {user.name}
                              {isCurrentUser && (
                                <span className="text-xs text-primaryColor-500">
                                  (You)
                                </span>
                              )}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge text={user.role} />
                      </td>
                      <td className="px-4 py-3">
                        <Badge text={user.status} />
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {formatRelativeTime(user.lastLogin)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleOpenModal(user)}
                            type="button"
                            className="transition-colors text-primaryColor-500/85 hover:text-primaryColor-500 text-sm"
                            title="Edit"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(user)}
                            type="button"
                            disabled={isCurrentUser}
                            className={cn(
                              "transition-colors text-sm text-destructive/85 hover:text-destructive",
                              isCurrentUser
                                ? "opacity-30 cursor-not-allowed"
                                : ""
                            )}
                            title={
                              isCurrentUser
                                ? "Cannot delete yourself"
                                : "Delete"
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </SimpleCard>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingUser ? "Edit User" : "Add User"}
      >
        <UserForm
          editingUser={editingUser}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
        />
      </Modal>

      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete User"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">
              {deleteConfirm?.name}
            </span>
            ? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteConfirm(null)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={() => handleDelete(deleteConfirm.id)}
              className="flex-1"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
