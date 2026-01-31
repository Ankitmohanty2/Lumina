import { createContext, useState, type ReactNode } from "react";

interface StudentContextType {
  studentId: string | null;
  setStudentId: (id: string | null) => void;
}

export const StudentContext = createContext<StudentContextType | null>(null);

export const StudentProvider = ({ children }: { children: ReactNode }) => {
  const [studentId, setStudentId] = useState<string | null>(null);

  return (
    <StudentContext.Provider value={{ studentId, setStudentId }}>
      {children}
    </StudentContext.Provider>
  );
};