'use client';

import { actionFunction } from '@/app/utils/actions';
import { useActionState } from 'react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const initialState = {
	message: '',
};

function FormContainer({
	action,
	children,
}: {
	action: actionFunction;
	children: React.ReactNode;
}) {
	const [state, formAction] = useActionState(action, initialState);

	useEffect(() => {
		if (state.message) {
			toast(state.message);
		}
	}, [state]);

	return <form action={formAction}>{children}</form>;
}

export default FormContainer;
