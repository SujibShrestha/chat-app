interface AvatarProps {
  className?: string;
  user: string | undefined;
}

const Avatar = ({className , user}:AvatarProps) => {
  
  return (
   <div className="avatar">
  <div className={` rounded-xl ${className}`}>
    <img src={user} />
  </div>
</div>

  )
}

export default Avatar