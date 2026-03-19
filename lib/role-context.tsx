"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type UserRole = "AP_MANAGER" | "AI_OPS"

interface RoleContextValue {
  role: UserRole
  setRole: (r: UserRole) => void
}

const RoleContext = createContext<RoleContextValue>({
  role: "AI_OPS",
  setRole: () => {},
})

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>("AI_OPS")
  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>
}

export function useRole() {
  return useContext(RoleContext)
}
