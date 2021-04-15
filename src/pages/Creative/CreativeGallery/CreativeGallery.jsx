import React from 'react';



import './CreativeGallery.scss';

export default function CreativeGallery(props) {

    let showLess = props.showLess;
    let lessProjects = '';

    if (showLess !== null) {
        
    }


    return (

        <section class="main-gallery">
            <div class="gallery">
                <div class="col-sm-12 col-md-4">
                    <figure class="img-container">
                        <img src="https://res.cloudinary.com/dpqichyzo/image/upload/v1618391970/_CT16751-Recuperado_wehjao.jpg" />
                        <figcaption class="img-content">
                            <h2 class="title">Camera Film</h2>
                            <h3 class="category">Showcase</h3>
                        </figcaption>
                        <span class="img-content-hover">
                            <h2 class="title">Camera Film</h2>
                            <h3 class="category">Showcase</h3>
                        </span>
                    </figure>
                </div>
                <div class="col-sm-12 col-md-4">
                    <figure class="img-container">
                        <img src="https://res.cloudinary.com/dpqichyzo/image/upload/v1618391971/Envy_uo98ku.jpg" />
                        <figcaption class="img-content">
                            <h2 class="title">Smart Watch</h2>
                            <h3 class="category">Showcase</h3>
                        </figcaption>
                        <span class="img-content-hover">
                            <h2 class="title">Smart Watch</h2>
                            <h3 class="category">Showcase</h3>
                        </span>
                    </figure>
                </div>
                <div class="col-sm-12 col-md-4">
                    <figure class="img-container">
                        <img src="https://res.cloudinary.com/dpqichyzo/image/upload/v1618391970/_CT17069-5-Recuperado3_apgvhs.jpg" />
                        <figcaption class="img-content">
                            <h2 class="title">Camera Film</h2>
                            <h3 class="category">Showcase</h3>
                        </figcaption>
                        <span class="img-content-hover">
                            <h2 class="title">Camera Film</h2>
                            <h3 class="category">Showcase</h3>
                        </span>
                    </figure>
                </div>
                <div class="col-sm-8">
                    <figure class="img-container">
                        <img src="https://res.cloudinary.com/dpqichyzo/image/upload/v1618391970/_CT16865-3_lxuqt3.jpg" />
                        <figcaption class="img-content">
                            <h2 class="title">Wrist Watch</h2>
                            <h3 class="category">Showcase</h3>
                        </figcaption>
                        <span class="img-content-hover">
                            <h2 class="title">Wrist Watch</h2>
                            <h3 class="category">Showcase</h3>
                        </span>
                    </figure>
                </div>
                <div class="col-sm-12 col-md-4">
                    <figure class="img-container">
                        <img src="https://res.cloudinary.com/dpqichyzo/image/upload/v1618391969/_CT16572---experimentacion_tqlxzv.jpg" />
                        <figcaption class="img-content">
                            <h2 class="title">Coffee</h2>
                            <h3 class="category">Showcase</h3>
                        </figcaption>
                        <span class="img-content-hover">
                            <h2 class="title">Coffee</h2>
                            <h3 class="category">Showcase</h3>
                        </span>
                    </figure>
                </div>
                <div class="col-sm-12 col-md-5">
                    <figure class="img-container">
                        <img src="https://res.cloudinary.com/dpqichyzo/image/upload/v1618391970/_CT17446-EditarWEB_ehvm7b.jpg" />
                        <figcaption class="img-content">
                            <h2 class="title">Phone</h2>
                            <h3 class="category">Showcase</h3>
                        </figcaption>
                        <span class="img-content-hover">
                            <h2 class="title">Phone</h2>
                            <h3 class="category">Showcase</h3>
                        </span>
                    </figure>
                </div>
                <div class="col-sm-12 col-md-7">
                    <figure class="img-container">
                        <img src="https://res.cloudinary.com/dpqichyzo/image/upload/v1618391970/_CT17338-Editar4_fgspgd.jpg" />
                        <figcaption class="img-content">
                            <h2 class="title">Keyboard</h2>
                            <h3 class="category">Showcase</h3>
                        </figcaption>
                        <span class="img-content-hover">
                            <h2 class="title">Keyboard</h2>
                            <h3 class="category">Showcase</h3>
                        </span>
                    </figure>
                </div>
            </div>
        </section>

    )
}
