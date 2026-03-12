// Create a scroll video component, as i scroll down the video should change frame by frame. the animated guy in it should look like the photos attached

import {
    useEffect,
    useRef,
    useState,
    useCallback,
    startTransition,
    type CSSProperties,
} from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"
import { useScroll, useTransform, motion } from "framer-motion"

interface ScrollVideoProps {
    videoFile: string
    totalFrames: number
    frameRate: number
    scrollHeight: number
    backgroundColor: string
    borderRadius: number
    showProgress: boolean
    progressColor: string
    style?: CSSProperties
}

/**
 * Scroll Video Component
 *
 * A video that plays frame by frame based on scroll position
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */
export default function ScrollVideo(props: ScrollVideoProps) {
    const {
        videoFile = "https://framerusercontent.com/assets/MLWPbW1dUQawJLhhun3dBwpgJak.mp4",
        totalFrames = 120,
        frameRate = 30,
        scrollHeight = 2000,
        backgroundColor = "#000000",
        borderRadius = 8,
        showProgress = true,
        progressColor = "#FFFFFF",
    } = props

    const containerRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)
    const [currentFrame, setCurrentFrame] = useState(0)
    const isStatic = useIsStaticRenderer()

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const frameProgress = useTransform(
        scrollYProgress,
        [0, 1],
        [0, totalFrames - 1]
    )

    const drawFrame = useCallback(
        (frameNumber: number) => {
            const video = videoRef.current
            const canvas = canvasRef.current

            if (!video || !canvas || !isVideoLoaded) return

            const ctx = canvas.getContext("2d")
            if (!ctx) return

            // Calculate time for the specific frame
            const timeToSeek = frameNumber / frameRate

            // Set video time and draw to canvas
            video.currentTime = timeToSeek

            video.addEventListener(
                "seeked",
                function drawToCanvas() {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
                    video.removeEventListener("seeked", drawToCanvas)
                },
                { once: true }
            )
        },
        [frameRate, isVideoLoaded]
    )

    // Update frame based on scroll
    useEffect(() => {
        if (isStatic) return

        const unsubscribe = frameProgress.on("change", (latest) => {
            const frameNumber = Math.round(latest)
            if (
                frameNumber !== currentFrame &&
                frameNumber >= 0 &&
                frameNumber < totalFrames
            ) {
                startTransition(() => setCurrentFrame(frameNumber))
                drawFrame(frameNumber)
            }
        })

        return unsubscribe
    }, [frameProgress, currentFrame, totalFrames, drawFrame, isStatic])

    // Handle video load
    const handleVideoLoad = useCallback(() => {
        const video = videoRef.current
        const canvas = canvasRef.current

        if (!video || !canvas) return

        // Set canvas dimensions to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        startTransition(() => setIsVideoLoaded(true))

        // Draw first frame
        drawFrame(0)
    }, [drawFrame])

    // Progress percentage
    const progressPercentage = (currentFrame / (totalFrames - 1)) * 100

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: scrollHeight,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* Hidden video element for frame extraction */}
            <video
                ref={videoRef}
                src={videoFile}
                style={{ display: "none" }}
                onLoadedData={handleVideoLoad}
                preload="metadata"
                muted
                playsInline
            />

            {/* Sticky canvas container */}
            <div
                style={{
                    position: "sticky",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor,
                    borderRadius,
                    overflow: "hidden",
                }}
            >
                <canvas
                    ref={canvasRef}
                    style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        borderRadius,
                    }}
                />

                {/* Progress indicator */}
                {showProgress && (
                    <div
                        style={{
                            position: "absolute",
                            bottom: 20,
                            left: 20,
                            right: 20,
                            height: 4,
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            borderRadius: 2,
                            overflow: "hidden",
                        }}
                    >
                        <motion.div
                            style={{
                                height: "100%",
                                backgroundColor: progressColor,
                                borderRadius: 2,
                                width: `${progressPercentage}%`,
                            }}
                        />
                    </div>
                )}

                {/* Frame counter */}
                {showProgress && (
                    <div
                        style={{
                            position: "absolute",
                            top: 20,
                            right: 20,
                            color: progressColor,
                            fontSize: 14,
                            fontFamily: "monospace",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            padding: "4px 8px",
                            borderRadius: 4,
                        }}
                    >
                        {currentFrame + 1} / {totalFrames}
                    </div>
                )}

                {/* Loading state */}
                {!isVideoLoaded && (
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: progressColor,
                            fontSize: 16,
                            fontFamily: "system-ui, sans-serif",
                        }}
                    >
                        Loading video...
                    </div>
                )}
            </div>
        </div>
    )
}

addPropertyControls(ScrollVideo, {
    videoFile: {
        type: ControlType.File,
        title: "Video File",
        allowedFileTypes: ["mp4", "webm", "mov"],
    },
    totalFrames: {
        type: ControlType.Number,
        title: "Total Frames",
        defaultValue: 120,
        min: 1,
        max: 1000,
        step: 1,
    },
    frameRate: {
        type: ControlType.Number,
        title: "Frame Rate",
        defaultValue: 30,
        min: 1,
        max: 60,
        step: 1,
        unit: "fps",
    },
    scrollHeight: {
        type: ControlType.Number,
        title: "Scroll Height",
        defaultValue: 2000,
        min: 500,
        max: 10000,
        step: 100,
        unit: "px",
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Background Color",
        defaultValue: "#000000",
    },
    borderRadius: {
        type: ControlType.Number,
        title: "Border Radius",
        defaultValue: 8,
        min: 0,
        max: 50,
        step: 1,
        unit: "px",
    },
    showProgress: {
        type: ControlType.Boolean,
        title: "Show Progress",
        defaultValue: true,
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },
    progressColor: {
        type: ControlType.Color,
        title: "Progress Color",
        defaultValue: "#FFFFFF",
        hidden: ({ showProgress }) => !showProgress,
    },
})
