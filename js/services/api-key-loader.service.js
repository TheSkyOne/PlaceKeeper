async function loadGoogleMapsAPI() {
    try {
        // Fetch the API key from the text file
        const response = await fetch('../../APIKEY.txt'); // Replace with the actual path to your .txt file
        const apiKey = await response.text();
        
        // first script.src is when using the Non-Dynamic Library API import
        // second script.src is when using the Dynamic Library API import
        // https://developers.google.com/maps/documentation/javascript/load-maps-js-api#migrate-to-dynamic
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey.trim()}&libraries=maps,marker&v=beta&callback=initMap`;
        // script.src = 
        //     (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
        //         key: apiKey.trim(),
        //         v: "beta",
        //         // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
        //         // Add other bootstrap parameters as needed, using camel case.
        //     });

        script.defer = true;
        
        // Append the script to the document
        document.body.appendChild(script);

        console.log('Google Maps API script loaded successfully');
    } catch (error) {
        console.error('Failed to load the API key:', error);
    }
}

// Call the function to load the API script
loadGoogleMapsAPI();
