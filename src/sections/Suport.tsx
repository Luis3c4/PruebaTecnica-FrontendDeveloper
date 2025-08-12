import {
  useCreateDonationMutation,
  useDeleteDonationMutation,
  useUpdateDonationMutation,
  useGetDonationsQuery,
} from "@/api/formApi";
import { useState } from "react";
import { z } from "zod";
import { X } from "lucide-react";
import { Pencil } from "lucide-react";
import ModalEditar from "@/components/modalEditar";

const donationSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.email("Correo inválido"),
  amount: z.number().positive("Monto inválido"),
  message: z.string().optional(),
});

type Support = {
  name: string;
  email: string;
  amount: number;
  message: string;
};
type Donation = Support & {
  id: string;
};
type ValidationErrors = {
  [K in keyof Support]?: string;
};
function Support() {
  const [formData, setFormData] = useState<Support>({
    name: "",
    email: "",
    amount: 0,
    message: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDonation, setEditingDonation] = useState<Donation | null>(null);

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  // const [editingId, setEditingId] = useState<number | null>(null);

  const {
    data: donations = [],
    isLoading: loadingDonations,
    error: fetchError,
  } = useGetDonationsQuery();
  console.log(donations);
  const [createDonation, { isLoading, error }] = useCreateDonationMutation();
  const [deleteDonation] = useDeleteDonationMutation();
   const [updateDonation, { isLoading: isUpdating }] = useUpdateDonationMutation();
  const handleSaveEdit = async (updatedData: Omit<Donation, "id">) => {
    if (!editingDonation) return;

    try {
      await updateDonation({
        id: editingDonation.id,
        ...updatedData,
      }).unwrap();

      handleCloseModal();
      console.log("Donación actualizada exitosamente");
    } catch (error) {
      console.error("Error actualizando donación:", error);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "amount" ? parseFloat(value) : value,
    });
  };
  const validateForm = (): boolean => {
    try {
      // Validar con Zod
      donationSchema.parse(formData);
      setValidationErrors({}); // Limpiar errores si la validación pasa
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convertir errores de Zod a nuestro formato
        const errors: ValidationErrors = {};
        error.issues.forEach((err) => {
          if (err.path.length > 0) {
            const field = err.path[0] as keyof Support;
            errors[field] = err.message;
          }
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validar formulario antes de enviar
    if (!validateForm()) {
      console.log("Formulario inválido:", validationErrors);
      return; // No enviar si hay errores
    }
    try {
      await createDonation({
        name: formData.name,
        email: formData.email,
        amount: formData.amount,
        message: formData.message,
      }).unwrap();
      setFormData({ name: "", email: "", amount: 0, message: "" });
    } catch (e) {
      console.error("Error creando donación:", e);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteDonation(id).unwrap();
    } catch (err) {
      console.error("Error eliminando donación:", err);
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDonation(null);
  };
  const handleEditClick = (donation: Donation) => {
    setEditingDonation(donation);
    setIsModalOpen(true);
  };
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-300 mb-4">
        Support The Rick and Morty API
      </h1>
      <main className="">
        <div className="space-y-4">
          <h2 className="font-bold text-[20px] text-gray-400">
            Help to maintain The Rick and Morty API's infrastructure!
          </h2>
          <p className="text-gray-400 text-[18px]">
            If you are using the API for your app, your online tutorials or your
            coding challenges, please consider supporting us to help keep the
            project alive.
          </p>
          <p className="text-gray-400 text-[18px]">
            We are not getting any money from this and we use our free time to
            keep the API running and the data up to date. Every contribution,
            however big or small, is super valuable for our future.
          </p>
          <p className="text-gray-400 text-[18px]">Thanks!</p>
        </div>
      </main>
      <div className=" max-w-2xs mx-auto mt-8">
        <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <input
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
              className={` w-full p-2 border rounded ${
                validationErrors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {validationErrors.name && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.name}
              </p>
            )}
          </div>
          <div>
            <input
              name="email"
              placeholder="Correo"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                validationErrors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.email}
              </p>
            )}
          </div>
          <div>
            <input
              name="amount"
              placeholder="Cantidad"
              value={formData.amount}
              type="number"
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                validationErrors.amount ? "border-red-500" : "border-gray-300"
              }`}
            />
            {validationErrors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.amount}
              </p>
            )}
          </div>
          <div>
            <textarea
              name="message"
              placeholder="Mensaje opcional"
              value={formData.message}
              onChange={handleChange}
              className={` w-full p-2 border rounded ${
                validationErrors.message ? "border-red-500" : "border-gray-300"
              }`}
            />
            {validationErrors.message && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          >
            {isLoading ? "Enviando..." : "Donar"}
          </button>
          {error && <p className="text-red-500">Error al enviar</p>}
        </form>
      </div>
      <ModalEditar
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        donation={editingDonation}
        onSave={handleSaveEdit}
        isLoading={isUpdating}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {loadingDonations ? (
          <p className="text-gray-400">Cargando donaciones...</p>
        ) : fetchError ? (
          <p className="text-red-500">Error al cargar donaciones</p>
        ) : (
          donations.map((d) => (
            <div key={d.id} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{d.name}</h3>
                <div>
                  <X
                    className="text-gray-300 hover:text-red-500 cursor-pointer"
                    onClick={() => {
                      if (d.id !== undefined) handleDelete(d.id);
                    }}
                  />
                  <Pencil
                    className="text-gray-300 hover:text-blue-500 h-5 cursor-pointer"
                    onClick={() => handleEditClick(d as Donation)}
                  />
                </div>
              </div>
              <p className="text-sm">{d.email}</p>
              <p className="text-green-400 font-bold">Donó: ${d.amount}</p>
              {d.message && <p className="italic">{d.message}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Support;
