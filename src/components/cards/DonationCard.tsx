import type { Donation } from "@/types/donation";
import { Pencil, X } from "lucide-react";

interface DonationCardProps {
  donation: Donation;
  onEdit?: (donation: Donation) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
  className?: string;
}
function DonationCard({
  donation,
  onEdit,
  onDelete,
  showActions = true,
  className = "",
}: DonationCardProps) {
  return (
    <div className={`bg-gray-700 p-4 rounded-lg ${className}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{donation.name}</h3>

        {showActions && (
          <div className="flex gap-2">
            {onEdit && (
              <Pencil
                className="text-gray-300 hover:text-blue-500 h-5 cursor-pointer"
                onClick={() => onEdit(donation)}
              />
            )}
            {onDelete && (
              <X
                className="text-gray-300 hover:text-red-500 cursor-pointer"
                onClick={() => onDelete(donation.id)}
              />
            )}
          </div>
        )}
      </div>

      <p className="text-sm text-gray-300">{donation.email}</p>
      <p className="text-green-400 font-bold">Donó: ${donation.amount}</p>
      {donation.message && (
        <p className="italic text-gray-400 mt-2">{donation.message}</p>
      )}
    </div>
  );
}

export default DonationCard;
