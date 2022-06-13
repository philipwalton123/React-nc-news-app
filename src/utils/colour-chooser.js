const colours = ['#F74546', '#E00D76', '#246475', '#F9CD01']

export default function colourChooser(id) {
    
    return id < 4 ? colours[id - 1] : colours[id % 4]
}