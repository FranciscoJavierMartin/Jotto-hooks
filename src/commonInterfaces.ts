export interface IGlobalState {
  language: string;
  secretWord: string | null;
}

export interface IGlobalAction {
  payload: string;
  type: string;
}