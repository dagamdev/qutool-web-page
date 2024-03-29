import Image from "next/image"

export default function DiscordImage({id, type, image, alt, width, height}: {
  id: string
  type: 'user avatar' | 'guild icon'
  image: string
  alt?: string
  width?: number
  height?: number
}){
  const isAnimate = image.includes('a_')

  return (
    <Image src={`https://cdn.discordapp.com/${type == 'guild icon' ? 
        'icons' :
        'avatars'
      }/${id}/${image}.${isAnimate ? 
        'gif' : 
        'png'}?size=${width ?? 40}`
      } 
      alt={(alt ?? '')+' '+type} 
      width={width ?? 40} 
      height={height ?? 40} 
    />
  )
}