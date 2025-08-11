import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react';
import { useState } from "react";

type BusquedaProps = {
    onSearch: (name: string) => void;
};

function Busqueda({ onSearch }: BusquedaProps) {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(inputValue.trim());
    };

    return (
        <div className="max-w-2xl mx-auto px-6 mb-12">
            <form onSubmit={handleSubmit}>
                <div className="flex gap-4">
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        placeholder="Buscar personaje por nombre..."
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    />
                    <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6  cursor-pointer">
                        <Search className="h-4 w-4" />
                        Buscar
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Busqueda;