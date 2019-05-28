import React from 'react'

class Carousel extends React.Component {
    state = {
        photos:[],
        active:0
    };
    static getDerivedStateFromProps({ media }) {
        let photos = [];
        if (media && media.photos && media.photos.photo) {
            photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
        }

        return { photos };
    }

    handleIndexClick=(e)=>{
    this.setState({
        active:+e.target.dataset.index //the plus to cast to Number
        })
    };
    render() {
        const { photos, active } = this.state;
        return (
            <div className="carousel">
                <img src={photos[active].value} alt="animal" />
                <div className="carousel-smaller">
                    {photos.map((photo, index) => (
                        <img
                            onClick={this.handleIndexClick}
                            data-index = {index}
                            key={photo.value}
                            src={photo.value}
                            className={index === active ? "active" : ""}
                            alt="animal thumbnail"
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Carousel;