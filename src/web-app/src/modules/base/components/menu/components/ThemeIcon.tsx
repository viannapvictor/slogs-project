import { BiMoon, BiSun } from 'react-icons/bi';
import { ThemeType } from '../../../../shared/theme/ThemeOptions';

interface Props {
    theme: ThemeType;
}

export default function ThemeIcon({ theme }: Props): JSX.Element {
    const Icon = theme === ThemeType.Dark ? BiMoon : BiSun;
    return <Icon size={30} />;
}
