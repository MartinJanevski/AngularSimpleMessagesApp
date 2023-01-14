import { MessageDto } from '../feature/model/messsage.model';

export interface AppStateInterface {
  isLoading: boolean;
  error: string | null;
  messeges: MessageDto[];
  modalOpened: boolean;
}

export interface AppStateInterfaceState extends AppStateInterface {
  state: AppStateInterface;
}
