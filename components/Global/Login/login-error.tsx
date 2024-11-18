import { TriangleAlert } from 'lucide-react';
import { cn } from '@/lib/utils'; // Utility function for conditional classes

interface FormErrorProps {
	message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
	if (!message) return null;

	return (
		<div
			className={cn(
				'rounded-md p-3 flex items-center gap-x-2 text-sm',
				'dark:bg-red-800/20 dark:text-red-400',
				'bg-red-100 text-red-600'
			)}
		>
			<TriangleAlert className='h-4 w-4' />
			<p>{message}</p>
		</div>
	);
};
