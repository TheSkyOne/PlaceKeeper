async function loadGoogleMapsAPI() {
    try {
        // Fetch the API key from the text file
        const response = await fetch('../../APIKEY.txt'); // Replace with the actual path to your .txt file
        const apiKey = await response.text();
        
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey.trim()}&libraries=maps,marker&v=beta&callback=initMap`;

        script.defer = true;
        script.async = true
        
        // Append the script to the document
        document.body.insertBefore(script, document.getElementById("controller"));

        console.log('Google Maps API script loaded successfully');
    } catch (error) {
        console.error('Failed to load the API key:', error);
    }
}

// Call the function to load the API script
loadGoogleMapsAPI();
