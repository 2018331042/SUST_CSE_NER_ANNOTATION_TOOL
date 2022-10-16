import axios from "axios";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  email: string;
  name: string;
  id: string;
  role: string;
}
interface Auth {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: User;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ status: string; message: string; errorMessage?: string }>;
  signOut: () => void;
}

const AuthContext = createContext<Auth>({
  isLoading: false,
  isLoggedIn: false,
  user: null,
  signIn: (email: string, password: string) =>
    new Promise((res) => res({ status: "", message: "" })),
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const verifyToken = () => {
      const token = localStorage.getItem("token");
      console.log("token: ", token);
      if (token === null) {
        const isPublicRoute = ["/"].some((e) => e === router.pathname);
        if (!isPublicRoute) {
          router.push("/");
        }
        setLoading(false);
        return;
      }
      axios
        .post("/api/auth/verify-token", {
          token,
        })
        .then(async (response) => {
          console.log({ response });
          const {
            data: {
              data: { id, email, name, role },
              isVerified,
            },
          } = response;
          console.log({ id, email, name, role, isVerified });
          if (isVerified) {
            console.log("here");
            setUser({ email, name, role, id } as User);
            setLoggedIn(true);
            if (router.pathname === "/") router.push("/annotation");
          } else {
            setUser(null);
            setLoggedIn(false);
          }
        })
        .catch((err) => {
          console.log("error found");
        })
        .finally(() => {
          setLoading(false);
        });
    };

    verifyToken();
  }, []);

  const signIn = async (
    email: string,
    password: string
  ): Promise<{ status: string; message: string; errorMessage?: string }> => {
    console.log({ email, password });

    try {
      const response = await axios.post("/api/auth/sign-in", {
        email,
        password,
      });

      console.log({ response });

      const {
        data: { data, status, message },
      } = response;
      if (status === "FAILED") {
        return { status, message };
      }
      const { name, id, role, token } = data;
      localStorage.setItem("token", token);
      setLoggedIn(true);
      setUser({ email, name, id, role } as User);
      if (role === "admin") {
        router.push(`/${role}`);
      } else {
        router.push("/annotation");
      }
      setLoading(false);
      return { status: "success", message };
    } catch (err) {
      return {
        status: "FAILED",
        message: "something went wrong",
      };
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUser(null);
    router.push("/");
    return { status: "success", message: "logged out" };
  };

  return (
    <AuthContext.Provider
      value={{ isLoading, isLoggedIn, signIn, user, signOut }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
