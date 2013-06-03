define(type: "service", definition: [
  '$log','$timeout',
  ($log,  $timeout) ->
    @.start = (query, callback) ->
      (broadCastNewTweet = ->
        mockedTweets = [
          "text": "Compassion -- that's the one things no machine ever had. Maybe it's the one thing that keeps men ahead of them."
          "from_user": "McCoy"
          "profile_image_url": 'data:image/png;base64,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'
        ,
          "text": "Virtue is a relative term"
          "from_user": "Spock"
          "profile_image_url": 'data:image/png;base64,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'
        ,
          "text": "You go slow, be gentle. It's no one-way street -- you know how you feel and that's all. It's how the girl feels too. Don't press. If the girl feels anything for you at all, you'll know."
          "from_user": "Kirk"
          "profile_image_url": 'data:image/png;base64,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'
        ,
          "text": "You can't evaluate a man by logic alone."
          "from_user": "McCoy"
          "profile_image_url": 'data:image/png;base64,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'
        ,
          "text": "I am pleased to see that we have differences. May we together become greater than the sum of both of us."
          "from_user": "Surak of Vulcan"
          "profile_image_url": 'data:image/png;base64,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'
        ,
          "text": "A man either lives life as it happens to him, meets it head-on and licks it, or he turns his back on it and starts to wither away."
          "from_user": " Dr. Boyce"
          "profile_image_url": 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABJCAIAAAD+EZyLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAB+JJREFUaN7tmnlsFFUYwOfanT16bFu6LdADaG3TIkVqCxQFLYQrWrkkGDASQjCKYowaYqJyBA3Ei6gxRg0hwUhJFPoHIsFi0aIQQKUFYqWU0iLbA9rSc9ud02932vHtzOy2zG63Ldkvm92Zye7M93vf+d5bIm/ze/fri8DuXwmzhdnCbGG2MFuYLcymT3hB6GM5p4uRXn0MC1fGPBvD8d19LquJzk2b+ER+9oqCaUUzp87KTLVZzT19jIvlxiSbIIqg/SR7zMtPzv3ypdWfvbBqx7olb61ZtG3t4r2bln+9Zc0bKwuzUxLAjMNnw2FhYzlQWFy/IP+rLWueXzonNTFOxHCWF8GMDAcoeEJM1LPz877YvPqVp+YZSbJveAwYfDbwtGirec+GotdXFkZYTL0AJIg4jhMgpFvgEywF1ymK2ri44NMXV02yxzpd7GhnAwsk2CL3blqxcEZmL8sJIkYQ/VAEIh5GEsNxQMpNTwGPnZqSCP6Jj1o2sFBshOWDjcump03scbGSqTRFMqME3MuwSfEx729clpYYB8ejkQ0izEiR29YuyZkyEawhM0gYuLdIVDIhWDs5Pubd9UWxkRaI1VHH1sdwEDwLHsqQwBRUMglqNwlMOga8nClJr60ohAQLMorYgGdO9uTnFuT3uBg4lXgUB2rrydiSQLwVFeQsL8iRbjIq2MAbbVbTq8seoyABipgEI/H44vTlq5BSNxfNTbXHMsHwzCCwQQJYXjAtKyXRxfKaiU6mRY9RTtlRIbEmxkZvWDSb40cBG8vzUJ3WPZ4H8YbhPpHUIgcVSgt80G0WzXwwNy0p8IIeMBvHPzMvN94WASMdSA6QzQj3MNPG9Qtn4yNrNwiPxJiowpx0GGwJTP2OHmhaVWFAeIfOBvrprOSEAJvpgNhcHLf04Sy722iCGsyXaAKjpwImRlpMTz86Q7rtCLCBNlbaOH96Oril6Fdk1H7VBUGN6mVAzG26R7InJ42LDgRPPxvE+qyMVGiUQA9xaCJRySRqbPmbgDQ+Lnr+9IxA3DIgu83KTPbUtHsTBZiCCi2b+Rmp0JuFmg14ICSypXD3tgzqcsKAiFrfQQ/UkAzLZ6ckJo2z6a51OtncD062p8TbGI4bCpICw4/HIm7Jx0db8x5I1t2j6GQDh8lKskPjj+okIIKqq7abn1Pv4RAzk+xiiH2SIon0xHE8L/jVTFCT31NkMiw7NTkhymISdHUFhC6jiTDRSh8fJzmk2hUVBtQMOU2HVBgc7j8hLmpCTJS+SqCPTbBHWW0WWuqzBnUtP4lEMQSKgYBPk4Gy2yL1rYXpYYNnx0SYKYpQ4GgGnprE1/c1ky2BY5BRxJD5JEzSbFYzgeHqooxqLCd0dcbXLAPqPASCiVhshFlfE64zl0RZaHXP2K8NgqTlZhpxpThV3DPSTPufLgWTTcREyP4oA9oi+9Fb00S+8kr/seheYtKFpr/ncj/Wf9rQTIO+YlIT1XOM4aGtb+4ZpAynbu19hZavTOO/7gt6Nwz0sOHSiv/Qun5f2VJN5aspZflQsuFYp7NPnQAU8aaZaTTbToWJvCcNYgc8K2Q1ALJWW08vN9BwyUjq2qXm1yx0PoPW8622LieOhSpPQtpq6eqF2Q3uXcHUmWBQGaTPdC/J8M3tXUTIagBJErfbu5vbu6Fp8NNV+U8S0gE/0LVp5hu4PYxh491ueGKI2GAUO5yuKscdksDVWcH/lHTQDIn+CibdNY2tjXc7qZCxSVLlaJHVEAIQBQ+64gBjd6m+yddy9XCxQa9QUdfU5I4ETHMtxFdP7L/Wo2DAAw75x3WHPqPpZ4MRbe3qvVjXTHuaL3SBaChLI5pIijUvo4G8XN9c09hm9H5EKHwS8Mqr6p0MRwxs0CjqhOZynZdlvH8FF3HkVnB66kptIOvw+tlgOCHkzlTfMtMG9a4augaufpcOUL2lfRz51Gw0VNY1/X71Jm0gR4DNvWpCEN+fq2rr7pVDQr3bhm64+dptJDyLkDIwXO5l2IPllTwv6JvdBIONJBxtXYfPVXmmIf/DyLpq7gwrNk1RcsmSZgP1459XK+qbaAM1kntUbj0u1py8XGsxUqhZ0E1tfDBBwxKc8ELNrW/KK2iKClC3QNlwT6u3r+zi37fuWGgDai4/JkKjC00wANbQ2vHJsbN9DAe5aoTZJM90utgPj56tbmi1eOcVhcspDKWoHFBOmu527Sk53dTerTvvB5lNypktXc5dR8rP1zgAj0Ryg5/94f4Y85RpcOnqhpbth8quNrSaDFRQtAra/0sAr9Pp2l1y+tvySobjzAP6yUkCLQOouUxgIlE8euGfbYfK/m3tNBupYKkUzP88GTyV4MCvle8U//xbVR0mCiYDSRG4gkf6gHAC+5A49letY+d3ZZ8eP9fDMIFUs+Flk6YI4JPVjS27S8rfPlhaXF5xzXGbZVmKgGLohjeSBPDA1KauufXwmcrtxaU7Dp2EptFshFEItjJY8MW9wgeKXrnZvK/0wpsHjm/d/8POgyc+PvLL3pJTHx0p21V8Aq5s3X/s82NnIN3DD4IVYCFg68+QJtoYYTULBFnX2nX+elPplRsnKmt/unTj7DVHzZ0OVsQirBaziSYI0uO0+Jhg80xQPIC4+89oFE3TFovZarFYre4XiImmScqAu6kIbHjAsPB/6MNsYbYwW5gtzBZmG2vyH/eN0jNW3vjjAAAAAElFTkSuQmCC'
        ,
          "text": "First study the enemy. Seek weakness."
          "from_user": "Romulan Commander"
          "profile_image_url": 'data:image/png;base64,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'
        ,
          "text": "There are always alternatives."
          "from_user": "Mr Spock"
          "profile_image_url": 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABJCAIAAAD+EZyLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAB+JJREFUaN7tmnlsFFUYwOfanT16bFu6LdADaG3TIkVqCxQFLYQrWrkkGDASQjCKYowaYqJyBA3Ei6gxRg0hwUhJFPoHIsFi0aIQQKUFYqWU0iLbA9rSc9ud02932vHtzOy2zG63Ldkvm92Zye7M93vf+d5bIm/ze/fri8DuXwmzhdnCbGG2MFuYLcymT3hB6GM5p4uRXn0MC1fGPBvD8d19LquJzk2b+ER+9oqCaUUzp87KTLVZzT19jIvlxiSbIIqg/SR7zMtPzv3ypdWfvbBqx7olb61ZtG3t4r2bln+9Zc0bKwuzUxLAjMNnw2FhYzlQWFy/IP+rLWueXzonNTFOxHCWF8GMDAcoeEJM1LPz877YvPqVp+YZSbJveAwYfDbwtGirec+GotdXFkZYTL0AJIg4jhMgpFvgEywF1ymK2ri44NMXV02yxzpd7GhnAwsk2CL3blqxcEZmL8sJIkYQ/VAEIh5GEsNxQMpNTwGPnZqSCP6Jj1o2sFBshOWDjcump03scbGSqTRFMqME3MuwSfEx729clpYYB8ejkQ0izEiR29YuyZkyEawhM0gYuLdIVDIhWDs5Pubd9UWxkRaI1VHH1sdwEDwLHsqQwBRUMglqNwlMOga8nClJr60ohAQLMorYgGdO9uTnFuT3uBg4lXgUB2rrydiSQLwVFeQsL8iRbjIq2MAbbVbTq8seoyABipgEI/H44vTlq5BSNxfNTbXHMsHwzCCwQQJYXjAtKyXRxfKaiU6mRY9RTtlRIbEmxkZvWDSb40cBG8vzUJ3WPZ4H8YbhPpHUIgcVSgt80G0WzXwwNy0p8IIeMBvHPzMvN94WASMdSA6QzQj3MNPG9Qtn4yNrNwiPxJiowpx0GGwJTP2OHmhaVWFAeIfOBvrprOSEAJvpgNhcHLf04Sy722iCGsyXaAKjpwImRlpMTz86Q7rtCLCBNlbaOH96Oril6Fdk1H7VBUGN6mVAzG26R7InJ42LDgRPPxvE+qyMVGiUQA9xaCJRySRqbPmbgDQ+Lnr+9IxA3DIgu83KTPbUtHsTBZiCCi2b+Rmp0JuFmg14ICSypXD3tgzqcsKAiFrfQQ/UkAzLZ6ckJo2z6a51OtncD062p8TbGI4bCpICw4/HIm7Jx0db8x5I1t2j6GQDh8lKskPjj+okIIKqq7abn1Pv4RAzk+xiiH2SIon0xHE8L/jVTFCT31NkMiw7NTkhymISdHUFhC6jiTDRSh8fJzmk2hUVBtQMOU2HVBgc7j8hLmpCTJS+SqCPTbBHWW0WWuqzBnUtP4lEMQSKgYBPk4Gy2yL1rYXpYYNnx0SYKYpQ4GgGnprE1/c1ky2BY5BRxJD5JEzSbFYzgeHqooxqLCd0dcbXLAPqPASCiVhshFlfE64zl0RZaHXP2K8NgqTlZhpxpThV3DPSTPufLgWTTcREyP4oA9oi+9Fb00S+8kr/seheYtKFpr/ncj/Wf9rQTIO+YlIT1XOM4aGtb+4ZpAynbu19hZavTOO/7gt6Nwz0sOHSiv/Qun5f2VJN5aspZflQsuFYp7NPnQAU8aaZaTTbToWJvCcNYgc8K2Q1ALJWW08vN9BwyUjq2qXm1yx0PoPW8622LieOhSpPQtpq6eqF2Q3uXcHUmWBQGaTPdC/J8M3tXUTIagBJErfbu5vbu6Fp8NNV+U8S0gE/0LVp5hu4PYxh491ueGKI2GAUO5yuKscdksDVWcH/lHTQDIn+CibdNY2tjXc7qZCxSVLlaJHVEAIQBQ+64gBjd6m+yddy9XCxQa9QUdfU5I4ETHMtxFdP7L/Wo2DAAw75x3WHPqPpZ4MRbe3qvVjXTHuaL3SBaChLI5pIijUvo4G8XN9c09hm9H5EKHwS8Mqr6p0MRwxs0CjqhOZynZdlvH8FF3HkVnB66kptIOvw+tlgOCHkzlTfMtMG9a4augaufpcOUL2lfRz51Gw0VNY1/X71Jm0gR4DNvWpCEN+fq2rr7pVDQr3bhm64+dptJDyLkDIwXO5l2IPllTwv6JvdBIONJBxtXYfPVXmmIf/DyLpq7gwrNk1RcsmSZgP1459XK+qbaAM1kntUbj0u1py8XGsxUqhZ0E1tfDBBwxKc8ELNrW/KK2iKClC3QNlwT6u3r+zi37fuWGgDai4/JkKjC00wANbQ2vHJsbN9DAe5aoTZJM90utgPj56tbmi1eOcVhcspDKWoHFBOmu527Sk53dTerTvvB5lNypktXc5dR8rP1zgAj0Ryg5/94f4Y85RpcOnqhpbth8quNrSaDFRQtAra/0sAr9Pp2l1y+tvySobjzAP6yUkCLQOouUxgIlE8euGfbYfK/m3tNBupYKkUzP88GTyV4MCvle8U//xbVR0mCiYDSRG4gkf6gHAC+5A49letY+d3ZZ8eP9fDMIFUs+Flk6YI4JPVjS27S8rfPlhaXF5xzXGbZVmKgGLohjeSBPDA1KauufXwmcrtxaU7Dp2EptFshFEItjJY8MW9wgeKXrnZvK/0wpsHjm/d/8POgyc+PvLL3pJTHx0p21V8Aq5s3X/s82NnIN3DD4IVYCFg68+QJtoYYTULBFnX2nX+elPplRsnKmt/unTj7DVHzZ0OVsQirBaziSYI0uO0+Jhg80xQPIC4+89oFE3TFovZarFYre4XiImmScqAu6kIbHjAsPB/6MNsYbYwW5gtzBZmG2vyH/eN0jNW3vjjAAAAAElFTkSuQmCC'
        ,
          "text": "There are certain things men must do to remain men."
          "from_user": "Kirk"
          "profile_image_url": 'data:image/png;base64,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'
        ,
          "text": "Those who hate and fight must stop themselves -- otherwise it is not stopped."
          "from_user": "Spock"
          "profile_image_url": 'data:image/png;base64,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'
        ,
        ]

        mockedTweet = [
          mockedTweets[Math.floor((Math.random()*mockedTweets.length))]
        ]

        callback(mockedTweet)
        $timeout(broadCastNewTweet, 5000)
      )()
])
