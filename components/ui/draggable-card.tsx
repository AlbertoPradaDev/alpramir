'use client'
import { cn } from '@/lib/utils'
import React, { useRef, useState, useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useVelocity,
  useAnimationControls,
} from 'motion/react'

// Physics-based draggable card (from Shelf "Draggable cards", id: draggable-cards),
// rebranded to Alpramir's editorial black-and-white surface. Drag has velocity
// throw + spring settle; hover tilts the card in 3D with a soft ink sheen.
export const DraggableCardBody = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()
  const [constraints, setConstraints] = useState({ top: 0, left: 0, right: 0, bottom: 0 })

  const velocityX = useVelocity(mouseX)
  const velocityY = useVelocity(mouseY)

  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 }

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [25, -25]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-25, 25]), springConfig)
  const opacity = useSpring(useTransform(mouseX, [-300, 0, 300], [0.8, 1, 0.8]), springConfig)
  const glareOpacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.18, 0, 0.18]),
    springConfig,
  )

  useEffect(() => {
    const updateConstraints = () => {
      if (typeof window !== 'undefined') {
        setConstraints({
          top: -window.innerHeight / 2,
          left: -window.innerWidth / 2,
          right: window.innerWidth / 2,
          bottom: window.innerHeight / 2,
        })
      }
    }
    updateConstraints()
    window.addEventListener('resize', updateConstraints)
    return () => window.removeEventListener('resize', updateConstraints)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const { width, height, left, top } = cardRef.current?.getBoundingClientRect() ?? {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    }
    const centerX = left + width / 2
    const centerY = top + height / 2
    mouseX.set(clientX - centerX)
    mouseY.set(clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={constraints}
      onDragStart={() => {
        document.body.style.cursor = 'grabbing'
      }}
      onDragEnd={(event, info) => {
        document.body.style.cursor = 'default'
        controls.start({
          rotateX: 0,
          rotateY: 0,
          transition: { type: 'spring', ...springConfig },
        })
        const currentVelocityX = velocityX.get()
        const currentVelocityY = velocityY.get()
        const velocityMagnitude = Math.sqrt(
          currentVelocityX * currentVelocityX + currentVelocityY * currentVelocityY,
        )
        const bounce = Math.min(0.8, velocityMagnitude / 1000)

        animate(info.point.x, info.point.x + currentVelocityX * 0.3, {
          duration: 0.8,
          ease: [0.2, 0, 0, 1],
          bounce,
          type: 'spring',
          stiffness: 50,
          damping: 15,
          mass: 0.8,
        })
        animate(info.point.y, info.point.y + currentVelocityY * 0.3, {
          duration: 0.8,
          ease: [0.2, 0, 0, 1],
          bounce,
          type: 'spring',
          stiffness: 50,
          damping: 15,
          mass: 0.8,
        })
      }}
      style={{ rotateX, rotateY, opacity, willChange: 'transform' }}
      animate={controls}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative flex min-h-80 w-72 flex-col items-center justify-center overflow-hidden rounded-sm border border-line bg-paper p-4 shadow-2xl transform-3d cursor-grab active:cursor-grabbing sm:min-h-96 sm:w-80',
        className,
      )}
    >
      {children}
      <motion.div
        style={{ opacity: glareOpacity }}
        className="pointer-events-none absolute inset-0 select-none bg-ink"
      />
    </motion.div>
  )
}

export const DraggableCardContainer = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return <div className={cn('[perspective:3000px]', className)}>{children}</div>
}
