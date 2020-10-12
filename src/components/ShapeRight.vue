<template>
    <div>
        <button @click="$root.$data.isR = !$root.$data.isR, $root.$data.isL = false" class="shape1-content btn btn-success">
            LogIn
        </button>
    </div>
</template>

<script>
export default {
    name: "ShapeOne",

}
</script>

<style lang="scss" scoped>
    .shape1 {
        -webkit-transform: rotate(15deg);
        -moz-transform: rotate(15deg);
        height: 155vh;
        left: 51%;
        background: darkseagreen;
        position: absolute;
        top: -25vh;
        width: 57%;
        -webkit-transition: all 1s ease-in-out; /** Chrome & Safari **/
        -moz-transition: all 1s ease-in-out; /** Firefox **/
        -o-transition: all 1s ease-in-out; /** Opera **/
        overflow: hidden;
        z-index: 100;
    &:before {
         content: "";
         position: absolute;
         width: 100%;
         height: 100%;
         z-index: -1;
         top: 17%;
         right: 7%;
         background: url('../assets/images/b1.jpg') no-repeat;
         -webkit-transform: rotate(-15deg);
         transform: rotate(-15deg);
         background-size: contain;
     }
    .shape1-content {
        -webkit-transform: rotate(-15deg);
        -moz-transform: rotate(-15deg);
        top: 50%;
        position: absolute;
        left: 50%;
    }
    }
    .moveR{
        -webkit-transition: all 1s ease-in-out; /** Chrome & Safari **/
        -moz-transition: all 1s ease-in-out; /** Firefox **/
        -o-transition: all 1s ease-in-out; /** Opera **/
        height: 155vh;
        left: 51%;
        position: absolute;
        overflow: hidden;
        top: -25%;
        width: 57%;
        transform: translate(2000px,0);
        -webkit-transform: translate(2000px,0); /** Chrome & Safari **/
        -o-transform: translate(2000px,0); /** Opera **/
        -moz-transform: translate(2000px,0); /** Firefox **/
        background: url('../assets/images/b1.jpg') center no-repeat;
        background-size: contain;
        z-index: 100;
        &:before {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: -1;
            top: 17%;
            right: 7%;
            background: url('../assets/images/b1.jpg') no-repeat;
            -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
            background-size: contain;
        }
        .shape1-content {
            -webkit-transform: rotate(-15deg);
            -moz-transform: rotate(-15deg);
            top: 50%;
            position: absolute;
            left: 50%;
        }
    }
</style>