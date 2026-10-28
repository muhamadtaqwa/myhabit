import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import toast, { Toaster } from 'react-hot-toast';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

export function AppToaster() {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
        if (flash?.info) {
            toast(flash.info, {
                icon: <Info className="w-4 h-4 text-blue-400 stroke-[2.5]" />,
            });
        }
    }, [flash]);

    return (
        <Toaster
            position="top-center"
            containerStyle={{
                top: 20,
            }}
            toastOptions={{
                duration: 3500,
                style: {
                    background: '#18181b', // Zinc 900
                    color: '#f4f4f5',      // Zinc 100
                    borderRadius: '1rem',
                    padding: '10px 16px',
                    fontSize: '12px',
                    fontWeight: '600',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                },
                success: {
                    icon: <CheckCircle2 className="w-4 h-4 text-emerald-400 stroke-[2.5]" />,
                },
                error: {
                    icon: <AlertCircle className="w-4 h-4 text-rose-400 stroke-[2.5]" />,
                },
            }}
        />
    );
}

export { toast };
