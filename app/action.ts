'use server'
export async function getComment(videoId: string) {
  const apiUrl = 'https://youtube.googleapis.com/youtube/v3/commentThreads'
  const apiKey = process.env.API_KEY
  const accessToken = ''

  // const url = `${apiUrl}?part=snippet%2Creplies&videoId=${videoId}&key=${apiKey}`
  const url = `${apiUrl}?part=snippet&order=relevance&videoId=${videoId}&key=${apiKey}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    // Get snippet field from data.items
    const snippet = data.items.map((item) => item.snippet)
    console.log(snippet)
    return snippet
  } catch (error) {
    console.error('Error fetching data:', error.message)
  }
}

export async function getChannelDetail(channelId: string) {
  const apiUrl = 'https://youtube.googleapis.com/youtube/v3/channels'
  const apiKey = process.env.API_KEY
  const accessToken = ''

  const url = `${apiUrl}?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${apiKey}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    // Get snippet field from data.items
    const snippet = data.items.map((item) => item.snippet)
    return snippet[0]
  } catch (error) {
    console.error('Error fetching data:', error.message)
  }
}

// Get video detail from videoId
export async function getVideoDetail(videoId: string) {
  const apiUrl = 'https://youtube.googleapis.com/youtube/v3/videos'
  const apiKey = process.env.API_KEY
  const accessToken = ''

  const url = `${apiUrl}?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${apiKey}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json'
      }
    })

    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    // Get snippet field from data.items
    const snippet = data.items.map((item) => item.snippet)
    return snippet[0]
  } catch (error) {
    console.error('Error fetching data:', error.message)
  }
}
