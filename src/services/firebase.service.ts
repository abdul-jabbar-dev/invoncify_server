import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import admin from "firebase-admin";

@Injectable()
export class FirebaseService {
  private readonly logger = new Logger(FirebaseService.name);

  constructor() {
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;

    if (!serviceAccountString) {
      this.logger.error('FIREBASE_SERVICE_ACCOUNT environment variable is not set');
      throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set');
    }

    try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: "https://invoncify-600c8-default-rtdb.firebaseio.com"
            });
        } else {
            console.log("Firebase app already initialized");
        }
    } catch (error) {
      this.logger.error('Failed to parse FIREBASE_SERVICE_ACCOUNT', error);
      throw new Error('Invalid FIREBASE_SERVICE_ACCOUNT JSON');
    }
  }

  async parseToken(token: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken; 
    } catch (error) {
      this.logger.error('Token verification failed', error);
      throw new UnauthorizedException('Invalid Firebase token');
    }
  }
}
