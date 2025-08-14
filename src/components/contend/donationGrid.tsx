import type { Donation } from "@/types/donation";
import DonationCard from "../cards/DonationCard";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

interface DonationGridProps {
  donations: Donation[];
  loading?: boolean;
  error?: FetchBaseQueryError | SerializedError | undefined;
  onEdit?: (donation: Donation) => void;
  onDelete?: (id: number) => void;
  className?: string;
  emptyMessage?: string;
  gridCols?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}
function DonationGrip({
  donations = [],
  loading = false,
  error,
  onEdit,
  onDelete,
  className = "",
  emptyMessage = "No hay donaciones disponibles",
  gridCols = { sm: 1, md: 2, lg: 3, xl: 4 },
}: DonationGridProps) {
  const generateGridClasses = () => {
    const classes = ["grid", "gap-6", "mt-8"];

    if (gridCols.sm) classes.push(`grid-cols-${gridCols.sm}`);
    if (gridCols.md) classes.push(`md:grid-cols-${gridCols.md}`);
    if (gridCols.lg) classes.push(`lg:grid-cols-${gridCols.lg}`);
    if (gridCols.xl) classes.push(`xl:grid-cols-${gridCols.xl}`);

    return classes.join(" ");
  };
  // Estado de carga
  if (loading) {
    return (
      <div className={`mt-8 ${className}`}>
        <p>cargando donaciones</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`mt-8 ${className}`}>
        <p>Ocurrió un error inesperado</p>
      </div>
    );
  }
  if (!donations || donations.length === 0) {
    return (
      <div className={`mt-8 ${className}`}>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💝</div>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            Aún no hay donaciones
          </h3>
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      </div>
    );
  }
  return (
    <div className={`${className}`}>
      {/* Header con estadísticas */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-300">
            Donaciones Recientes
          </h2>
          <div className="text-sm text-gray-400">
            Total: {donations.length} donación{donations.length !== 1 ? 'es' : ''}
          </div>
        </div>
        
        {/* Estadísticas rápidas */}
        <div className="mt-2 text-sm text-gray-500">
          Total recaudado: $
          {donations.reduce((total, donation) => total + donation.amount, 0).toLocaleString()}
        </div>
      </div>

      {/* Grid de donaciones */}
      <div className={generateGridClasses()}>
        {donations.map((donation) => (
          <DonationCard
            key={donation.id}
            donation={donation}
            onEdit={onEdit}
            onDelete={onDelete}
            className="transform transition-transform hover:scale-105"
          />
        ))}
      </div>

      {/* Footer con información adicional */}
      {donations.length > 0 && (
        <div className="mt-6 text-center p-6 text-sm text-gray-500">
          Mostrando {donations.length} de {donations.length} donaciones
        </div>
      )}
    </div>
  )
}

export default DonationGrip;
