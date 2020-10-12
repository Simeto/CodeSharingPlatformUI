<template>
    <div class="html-example">
        <div  v-for="title in htmlExampleJSON.titles" :key="title.description"  class="left-side">
            <div class="titles">
                {{ title.share }}
            </div>
            <div class="main-text">
                {{ title.main }}
            </div>
            <div class="update">
                {{ title.update }}
            </div>
            <div class="description">
                {{ title.description }}
            </div>
            <a href="https://www.lipsum.com/" class="learn-more">
                <span>Learn More</span>
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
        <div class="right-side">
            <div v-for="data in htmlExampleJSON.texts" :key="data.url" class="group">
                <div class="group-picture one">
                    {{ data.picture }}
                </div>
                <div class="group-exclusive" v-if="data.exclusive">
                    {{data.exclusive.text}}
                </div>
                <div class="group-title">
                    {{ data.title }}
                </div>
                <div class="group-description">
                    <span>{{ data.description }}</span>
                </div>
            </div>
        </div>
        <a href="https://www.lipsum.com/" class="learn-more">
            <span>Learn More</span>
            <i class="fas fa-arrow-right"></i>
        </a>
    </div>
</template>

<script>
    import HTMLExampleJSON from '@/assets/json/HTMLExampleText.json'
    export default {
        name: "Pictures",
        data() {
            return {
                htmlExampleJSON: HTMLExampleJSON
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/styles/media';
    @font-face {
        font-family: 'Open Sans';
        src: url('../assets/fonts/OpenSans-Regular.ttf');
    }

    .html-example {
        display: flex;
        padding: 7vh 7vh;
        flex-wrap: wrap;
        .left-side{
            display: flex;
            font-size: 16px;
            line-height: 24px;
            padding-bottom: 10vh;
            .titles{
                font-style: normal;
                font-weight: normal;
                font-size: 16px;
                line-height: 24px;
                color: rgba(36, 49, 67, 0.6);
                mix-blend-mode: normal;
                padding: 0 0 3vh 0;
            }
            .main-text{
                font-size: 24px;
                line-height: 32px;
                color: #00204D;
                padding: 0 0 3vh 0;
            }
            .update{
                font-size: 16px;
                line-height: 24px;
                color: #9BC225;
                mix-blend-mode: normal;
                padding: 0 0 7vh 0;
            }
            .description{
                font-style: normal;
                font-weight: normal;
                font-size: 18px;
                line-height: 24px;
                color: #00204D;
                word-break: break-word;
                bottom: 0;
            }
            .learn-more{
                font-size: 24px;
                line-height: 32px;
                color: #408BEA;
                margin-top: auto;
                i{
                    margin-left: 2vh;
                }
            }
        }
        .right-side{
            display: flex;
            flex-wrap: wrap;
            .one{
                width: 6px;
                height: 15px;
                left: 53px;
                top: 311px;

                background: linear-gradient(0deg, #295296 0%, #3E78D3 100%);
            }
            .group{
                word-wrap: break-word;
                font-size: 16px;
                line-height: 24px;
                display: flex;
                flex-direction: column;
                &-picture{
                    width: 32px;
                    height: 32px;
                    background: linear-gradient(330.64deg, #70B1FF 0%, #005CCD 100%);
                    mix-blend-mode: normal;
                    opacity: 0.45;
                    border-style: dashed;
                }
                &-title{
                    color: #00204D;
                    padding: 1vh 0 1vh 0;
                }
                &-description{
                    font-style: normal;
                    font-weight: normal;
                    color: rgba(36, 49, 67, 0.9);
                    span[--nth-word="1"] { background: cyan; }

                }
                &-exclusive{
                    background: #9BC225;
                    color: #fff;
                    border-radius: 5px;
                    width: 80px;
                    text-align: center;
                    font-style: normal;
                    font-weight: bold;
                    font-size: 11px;
                    line-height: 16px;
                    text-transform: uppercase;
                    margin-top: 1vh;
                }
            }
        }
        .learn-more{
            font-size: 24px;
            line-height: 32px;
            color: #408BEA;
            margin-top: auto;
            padding-top: 7vh;
            align-items: center;
            text-decoration: none;
            i{
                margin-left: 2vh;
            }
        }
    }
</style>