export const PlayClick = () => {
    const audio = new Audio("/sound/click.ogg")
    audio.volume = 0.5
    audio.play()
}