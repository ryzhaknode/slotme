import type { IUser } from '../../types/authTypes';
import ContactsList from '../ContactsList/ContactsList';

interface IProps {
  contacts: IUser[];
  onSelectContact: (contact: IUser) => void;
  selectedUserId?: string | null;
}

export default function ContactsSidebar({ contacts, onSelectContact, selectedUserId }: IProps) {
  return (
    <aside className="w-1/3 min-w-[250px] bg-gray-50 rounded-[20px] p-4 overflow-y-auto max-h-[600px]">
      <h2 className="text-xl font-semibold mb-4">Contacts</h2>
      <ContactsList contacts={contacts} onSelect={onSelectContact} selectedUserId={selectedUserId} />
    </aside>
  );
}
