import { useNavigate } from "react-router-dom";
import Button from "../../shared/components/Button";
import Stack from "../../shared/components/Stack";
import { useAuth } from "../../shared/hooks/api-hooks";

export default function SettingsPage(): JSX.Element {
    const { deleteAccount } = useAuth();
    const navigate = useNavigate();

    return (
        <Stack alignItems="center">
            <Button onClick={() => {
                deleteAccount().then(result => {
                    if (result.success) navigate("/")
                })
            }} color="#CC2121">
                Deletar conta
            </Button>
        </Stack>
    );
}