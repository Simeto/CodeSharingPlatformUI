<template>
    <div>
        <button  @click="$root.$data.isL = !$root.$data.isL, $root.$data.isR = false" class="shape2-content btn btn-success">
           SignUp
        </button>
    </div>
</template>

<script>

export default {
    name: "ShapeLeft"
}
</script>

<style lang="scss" scoped>
    .shape2 {
        -webkit-transform: rotate(15deg);
        -moz-transform: rotate(15deg);
        background: beige;
        bottom: -12vh;
        height: 200vh;
        position: absolute;
        right: 45%;
        width: 61%;
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
            top: 40%;
            left: 28%;
            background: url('../assets/images/b2.png') no-repeat;
            -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
            background-size: contain;
        }
        .shape2-content {
            -webkit-transform: rotate(-15deg);
            -moz-transform: rotate(-15deg);
            top: 72%;
            position: absolute;
            left: 50%;

        }
    }
    .moveL{
        transform: translate(-2000px,0);
        -webkit-transform: translate(-2000px,0); /** Chrome & Safari **/
        -o-transform: translate(-2000px,0); /** Opera **/
        -moz-transform: translate(-2000px,0); /** Firefox **/
        background: beige;
        bottom: -80px;
        height: 200vh;
        position: absolute;
        right: 45%;
        width: 61%;
        overflow: hidden;
        -webkit-transition: all 1s ease-in-out; /** Chrome & Safari **/
        -moz-transition: all 1s ease-in-out; /** Firefox **/
        -o-transition: all 1s ease-in-out; /** Opera **/
        z-index: 100;
        &:before {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: -1;
            top: 40%;
            left: 28%;
            background: url('../assets/images/b2.png') no-repeat;
            -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
            background-size: contain;
        }
        .shape2-content {
            -webkit-transform: rotate(-15deg);
            -moz-transform: rotate(-15deg);
            top: 72%;
            position: absolute;
            left: 50%;

        }
    }
</style>