
export const createLogin = () => {
    const loginElement = document.createElement('div');
    loginElement.id = 'loginContainer';
    loginElement.className = 'h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4';
    loginElement.innerHTML = `
        <div class="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                    Welcome Back
                </h2>
                <p class="text-gray-400 mt-2">Sign in to continue to TaskFlow</p>
            </div>

            <form id="loginForm" class="space-y-6">
                <div class="space-y-1">
                    <label for="email" class="block text-sm font-medium text-gray-300">
                        <i class="fa-regular fa-envelope mr-2 text-purple-400"></i>Email
                    </label>
                    <input type="email" id="email" name="email" required
                        class="input" 
                        placeholder="Enter your email"/>
                </div>

                <div class="space-y-1">
                    <label for="password" class="block text-sm font-medium text-gray-300">
                        <i class="fa-regular fa-lock mr-2 text-purple-400"></i>Password
                    </label>
                    <input type="password" id="password" name="password" required
                        class="input" 
                        placeholder="Enter your password"/>
                </div>

                <button data-auth type="submit" class="btn_primary w-full flex items-center justify-center gap-2">
                    <i class="fa-solid fa-right-to-bracket"></i>
                    Sign In
                </button>
            </form>

            <div class="mt-8 text-center">
                <p class="text-gray-400">
                    Don't have an account? 
                    <a href="/register" id="loginLink" class="text-purple-400 hover:text-purple-300 font-medium ml-1 transition-colors">
                        Create account
                    </a>
                </p>
            </div>
        </div>
    `;
    return loginElement;
};

export const handleLogin = async () => {
    const loginForm = document.getElementById('loginForm') as HTMLFormElement;

    if (loginForm){
        const data = new FormData(loginForm);
        const email = data.get('email') as string;
        const password = data.get('password') as string;


        // send a reuqest the server
        try {
            const response = await fetch('http://localhost/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });

            const result = await response.json();

            if (response.ok){
                console.log('Login successful', result);

                sessionStorage.setItem('user_id', String(result.data.user_Id));
                sessionStorage.setItem('role', result.data.role);

                console.log('logged in');
                
                return true;
            }
        } catch (err) {
            console.error('Error', err);
            alert('Error logging in');
            return false;            
        }
    }
};