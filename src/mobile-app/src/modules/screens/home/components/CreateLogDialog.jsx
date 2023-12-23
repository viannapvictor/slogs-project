import { VStack, AlertDialog } from 'native-base'
import { ButtonDefault, InputDefault, SelectDefault } from "../../../shared/components/DefaulltItems";
import { useRef, useState } from "react";
import { OrganizationManager } from '../../../shared/utils/slogs-firebase';
import { useAuth } from '../../../shared/hooks/slogs-hooks';

export default function CreateLogDialog({open = false, onClose = f => f}) {
    const [form, setForm] = useState({ title: '', description: '', urgency: '' });
    const { currentAccount } = useAuth()
    const cancelRef = useRef(null);

    const submitForm = () => {
        if (form.title === '' || form.description === '' || form.urgency === '') {
            alert('Um dos campos não está preenchido');
            return;
        }
        form.uid = currentAccount.uid;
        form.organizationId = currentAccount.uid;
        form.createdDateTime = new Date(Date.now());

        OrganizationManager.addIncidentLog(form).then((result) => {
            if (result.success) onClose();
        })
    }

    return (
        <AlertDialog flex={1} leastDestructiveRef={cancelRef} isOpen={open} onClose={() => onClose()}>
            <AlertDialog.Content w={'95%'}>
                <AlertDialog.CloseButton />
                <AlertDialog.Header>Adicionar incidente</AlertDialog.Header>
                <AlertDialog.Body>
                    <VStack alignItems={'center'} space={'24px'} flex={1}>
                        <VStack alignItems={'center'} space={'16px'}>
                            <InputDefault 
                                text={'Título'}
                                value={form.title}
                                setValue={(title) => setForm(value => ({ ...value, title }))}
                            />
                            <InputDefault 
                                text={'Descrição'}
                                value={form.description}
                                setValue={(description) => setForm(value => ({ ...value, description }))}
                            />
                        </VStack>
                        
                        <SelectDefault 
                            selected={form.urgency}
                            setSelected={(urgency) => setForm(value => ({ ...value, urgency }))}
                        />
                        <ButtonDefault 
                            message={'Enviar'}
                            onPress={() => submitForm()}
                        />
                    </VStack>
                </AlertDialog.Body>
            </AlertDialog.Content>
        </AlertDialog>
    );
}