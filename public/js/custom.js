async function deleteOrUpdateFunction(url, method, body=null) {
    console.log("The button was clicked...")

    // url = /teams/1
    const resp = await fetch(url, {
        method: method,
        body: body, // currently not used because we've only done a DELETE so far
        "Content Type": "application/json"
    })

    const json = await resp.json()
    
    switch(resp.status) {
        case 200: {
            window.location.href = "/teams"
            break
        }
        case 400: {
            console.log(`Error: ${json.error}`)
            break
        }
        case 404: {
            console.log(json)
            console.log(`Error: ${json.error}`)
            break
        }
        case 500: {
            console.log(`Error: ${json.error}`)
            break
        }
        default: {
            console.log("Something weird happened...")
        }
    }
}