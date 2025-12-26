import Logo from '../../public/clean-and-seal-logo.png';
import ProfileMenu from './profileMenu';
import { ThemeToggle } from './themeToggle';

export default function Header() {
    return (
        <div className="flex items-center justify-between p-2 w-full border-b">
            <div>
                <img src={Logo} alt="Clean and Seal Dental" className="max-w-60 w-full" />
            </div>
            <div className="flex items-center gap-2">
                <ThemeToggle />
                <ProfileMenu />
            </div>
        </div>
    );
}
