import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight  } from 'lucide-react';
type navProps= {
    currentPage: number;
    onPrev: () => void;
    onNext: () => void;
}
function NavButton({currentPage,onPrev,onNext}: navProps) {
    return (
        <div className="flex justify-end mb-6 gap-2">
            <Button 
                variant="outline"
                size="lg"
                className="bg-gray-800"
                disabled={currentPage === 1}
                onClick={onPrev}
            >
                <ChevronLeft />
                anterior
            </Button>
            <Button
                variant="outline"
                size="lg"
                className="bg-gray-800"
                onClick={onNext}
            >
                siguiente
                <ChevronRight />
            </Button>
        </div>

    );
}

export default NavButton;