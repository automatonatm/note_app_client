import axios from "axios";
import {Note} from "../models/note";
import { User } from "models/user";
import { UnauthorisedError } from "error/httpErrors";
import { log } from "console";



const config = {
    headers: {
        "Content-Type": "application/json",
      //  Authorization: `Bearer ${Cookie.get("auth_token")}`,
    },
};

export  async function fetchNotes(): Promise<Note []> {
   try {
       const { data } = await axios.get("/notes");
       return  data.data
   }catch (err: any) {


      if(err.response.Status  === 401) {


        throw new UnauthorisedError(
          err.response && err.response.data.error
            ? err.response.data.error
            : err.message
        );
      }else {

        throw Error(
          err.response && err.response.data.error
            ? err.response.data.error
            : err.message
        );

      }

       

     

      
   }
}


export interface NoteInput {
    title: string,
    text?: string
}
 
export async function createNote(note: NoteInput): Promise<Note> {

    try {
        const { data } = await axios.post("/notes", note, config);
        return  data.data
    }catch (err: any) {
        throw Error(err.response && err.response.data.error ? err.response.data.error: err.message)
    }

}

export async function deleteNote(noteId: string) {
    try {
         await axios.delete(`/notes/${noteId}`, config);
       // return  data.data
    }catch (err: any) {
        throw Error(err.response && err.response.data.error ? err.response.data.error: err.message)
    }
}


 
export async function updateNote(noteId: string, note: NoteInput): Promise<Note> {
  try {
    const { data } = await axios.put(`/notes/${noteId}`, note, config);
    return data.data;
  } catch (err: any) {
    throw Error(
      err.response && err.response.data.error
        ? err.response.data.error
        : err.message
    );
  }
}


export async function getAuthUser(): Promise<User> {
  try {
    const { data } = await axios.get("/auth/me");
    return data.data;
  } catch (err: any) {
    throw Error(
      err.response && err.response.data.error
        ? err.response.data.error
        : err.message
    );
  }
}


export interface SignUpCredentials {
  username: string;
  email: string;
  password: string
}


export async function signUp(user: SignUpCredentials): Promise<User> {
  try {
    const { data } = await axios.post("/auth/signup", user, config);
    return data.data;
  } catch (err: any) {
    throw Error(
      err.response && err.response.data.error
        ? err.response.data.error
        : err.message
    );
  }
}


export interface LogInCredentials {
  username: string;
  password: string;
}



export async function loginIn(user: LogInCredentials): Promise<User> {
  try {
    const { data } = await axios.post("/auth/login", user, config);
    return data.data;
  } catch (err: any) {
    
        if (err.response.Status === 401) {
        
          throw new UnauthorisedError(
            err.response && err.response.data.error
              ? err.response.data.error
              : err.message
          );
        } else {
          throw Error(
            err.response && err.response.data.error
              ? err.response.data.error
              : err.message
          );
        }

  }
}



export async function logout() {
  try {
    await axios.post(`/auth/logout`, config);
    // return  data.data
  } catch (err: any) {
    throw Error(
      err.response && err.response.data.error
        ? err.response.data.error
        : err.message
    );
  }
}