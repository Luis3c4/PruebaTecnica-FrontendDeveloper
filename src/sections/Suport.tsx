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

const donationSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.email("Correo inválido"),
  amount: z.number().positive("Monto inválido"),
  message: z.string().optional(),
  id: z.number().optional(),
});

type Support = {
  name: string;
  email: string;
  amount: number;
  message: string;
};
function Support() {
  const [formData, setFormData] = useState<Support>({
    name: "",
    email: "",
    amount: 0,
    message: "",
  });
  // const [editingId, setEditingId] = useState<number | null>(null);

  const {
    data: donations = [],
    isLoading: loadingDonations,
    error: fetchError,
  } = useGetDonationsQuery();
  console.log(donations);
  // const [createDonation, { isLoading, error }] = useCreateDonationMutation();
  // const [deleteDonation] = useDeleteDonationMutation();
  // const [updateDonation] = useUpdateDonationMutation();

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: name === "amount" ? Number(value) : value,
  //   });
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const validation = donationSchema.omit({ id: true }).safeParse(formData);
  //   console.log(validation);
  //   if (!validation.success) {
  //     alert(validation.error.issues.map((err) => err.message).join(", "));
  //     return;
  //   }
  //   try {
  //     if (editingId) {
  //       // await updateDonation({
  //       //   ...formData,
  //       //   id: editingId,
  //       // }).unwrap();
  //       // setEditingId(null);
  //     } else {
  //       await createDonation({
  //         name: formData.name,
  //         email: formData.email,
  //         amount: formData.amount,
  //         message: formData.message,
  //       }).unwrap();
  //     }
  //     setFormData({ name: "", email: "", amount: 0, message: "" });
  //   } catch (err) {
  //     console.error("Error creando donación:", err);
  //   }
  // };
  // const handleDelete = async (id: number) => {
  //   try {
  //     await deleteDonation(id).unwrap();
  //   } catch (err) {
  //     console.error("Error eliminando donación:", err);
  //   }
  // };
  // const handleUpdate = async (donation: Support) => {
  //   setFormData({
  //     name: donation.name,
  //     email: donation.email,
  //     amount: donation.amount,
  //     message: donation.message || "",
  //   });
  //   setEditingId(donation.id || null);
  // };
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
        <form className=" flex flex-col gap-4">
          <input
            name="name"
            placeholder="Nombre"
            value={formData.name}
            
            className="border border-gray-300 p-2 rounded"
          />
          <input
            name="email"
            placeholder="Correo"
            value={formData.email}
            
            className="border border-gray-300 p-2 rounded"
          />
          <input
            name="amount"
            placeholder="Cantidad"
            value={formData.amount.toString()}
            type="number"
            className="border border-gray-300 p-2 rounded"
          />
          <textarea
            name="message"
            placeholder="Mensaje opcional"
            value={formData.message}
            
            className="border border-gray-300 p-2 rounded"
          />
          <button
            type="submit"
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          >
            boton
            { /*isLoading ? "Enviando..." : editingId ? "Actualizar" : "Donar"*/}
          </button>
          {/*error && <p className="text-red-500">Error al enviar</p>*/}
        </form>
      </div>
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
                      //if (d.id !== undefined) handleDelete(d.id);
                    }}
                  />
                  <Pencil
                    className="text-gray-300 hover:text-blue-500 h-5 cursor-pointer"
                    onClick={() => {
                      //handleUpdate(d)
                    }}
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
