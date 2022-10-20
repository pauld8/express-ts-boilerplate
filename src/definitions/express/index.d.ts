import express from 'express';
import { IUserRole } from '../../models/User';

declare global {
  namespace Express {
    export interface Response {
      sendResponse: any;
    }

    export interface User {
      id: number;
      username: string;
      role: IUserRole;
      full_name_eng: string;
      full_name_heb: string;
      hash: string;
      salt: string;
    }
  }
}
