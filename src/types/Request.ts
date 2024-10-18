import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

interface AuthRequest extends Request {
  user?: DecodedIdToken;
}

export default AuthRequest;
