async function loadGoogleMapsAPI() {
    try {
        // Fetch the API key from the text file
        const response = await fetch('../../APIKEY.txt'); // Replace with the actual path to your .txt file
        const apiKey = await response.text();
        
        // Create a new script element
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey.trim()}&libraries=maps,marker&v=beta`;
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
