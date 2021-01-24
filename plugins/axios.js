export default function ({ $axios, $auth, redirect }) {

    $axios.onRequest((config) => {

        // Set the custom auth strategy header to users if they are logged in
        if($auth.loggedIn) {
            $axios.setHeader('Auth-Strategy', $auth.strategy.name === 'google' ? 'google' : 'local')
        }
    })

    $axios.onError((error) => {

        // If logged in check for 401 error with response from our server and log the user out
        if($auth.loggedIn) {
            const code = parseInt(error.response && error.response.status)
            if (code === 401) {
                if(error.response.config.headers['Auth-Strategy'] === 'local' || 'google') {
                    $auth.logout()
                    redirect('/sign-in')
                }
            }
        }
    })

}