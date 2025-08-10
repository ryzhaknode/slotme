import type { IUser } from '../../types/authTypes';

interface IProps {
  contacts: IUser[];
  onSelect: (contact: IUser) => void;
  selectedUserId?: string | null;
}

export default function ContactsList({ contacts, onSelect, selectedUserId }: IProps) {
  return (
    <ul className="space-y-3">
      {contacts && contacts.length > 0 ? (
        contacts.map((contact) => {
          const isSelected = contact.id === selectedUserId;

          return (
            <li
              key={contact.id}
              onClick={() => !isSelected && onSelect(contact)}
              className={`p-3 rounded-[12px] shadow-sm transition cursor-pointer border border-gray-100
                ${
                  isSelected
                    ? 'bg-green-500 text-white shadow-sm'
                    : 'bg-white hover:shadow-md hover:bg-gray-100 text-gray-900'
                }
              `}
            >
              <p className="font-semibold">{contact.name}</p>
              <p className="text-sm">{contact.email}</p>
            </li>
          );
        })
      ) : (
        <li className="text-gray-500 text-sm">No contacts available</li>
      )}
    </ul>
  );
}
