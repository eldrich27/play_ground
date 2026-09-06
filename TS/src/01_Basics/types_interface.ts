// Type alias
type Status = "pending" | "approved" | "rejected"; // Union literal
type UserID = string | number;

// Interface
interface Profile {
  id: UserID;
  username: string;
  readonly createdAt: Date; // Cannot be modified after creation
  bio?: string;             // Optional property
}

// Extending interfaces
interface AdminUser extends Profile {
  permissions: string[];
}

const manager: AdminUser = {
  id: 101,
  username: "manager_1",
  createdAt: new Date(),
  permissions: ["read", "write", "delete"]
};