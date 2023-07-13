'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { useEffect } from 'react'
import Link from 'next/link'
import { END_POINT } from '@/utils/config'
import { useUser } from '@/hooks'
import { windowExist } from '@/utils/services'

export default function Home() {
  const { user } = useUser()

  useEffect(()=> {
    console.log({user})

  }, [user])

  const handleClick = () => {
    if(windowExist) window.location.href = END_POINT+'auth'
  }

  return (
    <main className={styles.home}>
      <h1>Qutool Discord bot</h1>
      <Link href={'/dashboard'}>Go to dashboard</Link>
      <button onClick={handleClick}>Log in</button>
      <p className="notice">Hola que tal, como estas?</p>
      {/* <a href={END_POINT+'Qutool/auth'}>Login</a> */}
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, repudiandae nostrum! Hic dignissimos nostrum doloribus incidunt molestias eum, ullam est molestiae quaerat, tenetur, illum adipisci similique id. Eligendi harum ex officia impedit expedita, ut, mollitia doloribus incidunt excepturi corrupti, distinctio quasi veniam. Eaque dolores, similique tenetur atque culpa placeat nobis perferendis cumque dolorem eveniet excepturi, optio temporibus repellat recusandae nihil, molestiae itaque laudantium veritatis saepe voluptatibus incidunt quaerat amet! Rerum quos esse totam illo tenetur saepe repellat, minima voluptas molestiae impedit unde? Inventore sunt reprehenderit obcaecati quae voluptate earum sed quibusdam, rem sequi doloremque fugiat, veniam dicta. Iste molestiae accusamus eaque necessitatibus magni! Ducimus, distinctio totam! Laboriosam quia illum, itaque porro labore totam nemo esse ipsa. Est tempore delectus magnam molestias. Voluptatibus?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, veniam rem nihil ab, et aliquid qui, voluptatum sed facilis quos officiis velit quod harum praesentium provident. Neque deserunt facere totam expedita veniam magnam nobis dolores odit nulla perspiciatis eius ab, provident iure temporibus minima. Repellendus earum, voluptate iste quam non quos, inventore nobis quidem excepturi alias ipsa cupiditate maiores ipsum suscipit. Deserunt nobis, asperiores itaque nisi molestias modi quo minus reprehenderit sit repudiandae dolores officiis, fugit obcaecati molestiae cum laudantium excepturi natus. Ducimus sunt quas quae ea omnis beatae ratione possimus rem dolorem? Sunt quisquam id adipisci consequuntur officiis doloremque quaerat amet? Repellat sunt ipsam, ea recusandae adipisci incidunt impedit ab voluptate nemo minus non alias minima nostrum rerum dolorum officia! Eos et asperiores magni est corrupti vero cumque nemo quisquam veniam, numquam voluptatum, impedit, maxime facilis blanditiis totam eveniet. In tempore vero dignissimos ratione velit debitis at tenetur, pariatur, alias ullam a ducimus sint. Optio voluptatibus adipisci corrupti! Magnam deserunt optio accusantium adipisci ducimus facere voluptatibus atque quae maxime magni, neque eum tempore accusamus alias, autem corrupti inventore expedita, amet ad. Commodi qui perferendis reiciendis architecto magnam cupiditate quisquam voluptatum nihil mollitia ab, velit aspernatur sed aperiam, veniam eos.
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. At possimus deserunt unde facilis odit corrupti sapiente vero corporis sint repellendus exercitationem assumenda, amet sed expedita esse, accusamus libero debitis ratione?
      </p>
    </main>
  )
}
