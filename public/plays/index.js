const fs = require('fs')
const path = require('path')
const readline = require('readline')

const intToRoman = (number) => {
  const romanNumerals = [
    'i',
    'ii',
    'iii',
    'iv',
    'v',
    'vi',
    'vii',
    'viii',
    'ix',
    'x'
  ]

  return romanNumerals[number]
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = (question) =>
  new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })

fs.readdir(process.cwd(), async (xmlErr, xmlFiles) => {
  fs.readdir(
    path.join(process.cwd(), '/../data'),
    async (jsonErr, jsonFiles) => {
      const jsonFilesTrim = jsonFiles.map((jsonFile) => {
        return jsonFile.split('.')[0]
      })

      for await (let xmlFile of xmlFiles) {
        const xmlFileName = xmlFile.split('.')[0]
        const extention = xmlFile.split('.')[1]

        if (
          extention === 'xml' &&
          !jsonFilesTrim.includes(xmlFileName)
        ) {
          console.log('-------------------------------------')
          console.log(xmlFileName)
          console.log('-------------------------------------')

          const template = {
            xml: xmlFileName,
            actKeyframes: [
              {
                title: 'Dramatis Personae',
                time: '00:00:00'
              }
            ]
          }

          template.title = await question(
            'What is the title of the play? '
          )

          template.youtube = await question(
            'What is the youtube id of the play? '
          )

          let actIndex = 0
          while (actIndex >= 0) {
            const isNextAct = await question('Next act (y/n)? ')

            if (isNextAct === 'n') {
              actIndex = -1
            } else {
              const actTime = await question('Act time (y/n)? ')

              template.actKeyframes.push({
                title: `act ${intToRoman(actIndex)}`,
                time: actTime
              })

              actIndex += 1
            }
          }

          // Write xmlFile...
          fs.writeFile(
            path.join(process.cwd(), `/../data/${xmlFileName}.json`),
            JSON.stringify(template),
            'utf8',
            function (err, data) {
              if (err) {
                return console.log(err)
              }
              console.log(data)
            }
          )
        }
      }

      rl.close()
    }
  )
})
