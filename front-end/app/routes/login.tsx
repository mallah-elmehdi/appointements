import { BsGoogle } from 'react-icons/bs';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import Logo from '../../public/clean-and-seal-logo.png';
import type { Route } from './+types/login';
import { useState } from 'react';
import type { UserType } from '~/lib/types';
import { logIn } from '~/api/login';
import Loader from '~/components/loader';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Login | Clean and Seal Dental' },
        { name: 'description', content: 'Welcome to Clean and Seal Dental booking system!' },
    ];
}

export default function SignIn() {
    const [user, setUser] = useState<UserType | undefined>(undefined);
    const [loader, setLoader] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleGet = async () => {
        try {
            setLoader(true);
            const response = await logIn(username);
            const user = response.data.data.user;
            if (user.role === 'ADMIN') navigate('/admin/' + username);
            else if (user.role === 'USER') navigate('/dashboard/' + username);
        } catch (error) {
            // @ts-ignore
            toast.error(error?.response?.data?.message || error?.message || 'Error happened');
            return;
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="w-full max-w-sm ">
            {loader && <Loader />}

            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 0.4,
                    scale: { type: 'spring', visualDuration: 0.2, bounce: 0.25 },
                }}
            >
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <img src={Logo} alt="Clean and Seal Dental" className="w-full mb-3" />
                        <CardTitle>Login to your account</CardTitle>
                        <CardDescription>Enter your email below to login to your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Username</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Username"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <Input id="password" type="password" required />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full" onClick={() => handleGet()}>
                            Login
                        </Button>
                        <Button variant="outline" className="w-full">
                            <BsGoogle /> Login with Google
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
