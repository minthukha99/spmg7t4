<template>
<footer class="footer-bg-wrapper">
    <div class="footer-content-wrapper">
        <hr class="w-75 justify-self-center mx-auto" />
        <div class="footer-copyright">
            <p class="m-0 pb-2 text-center text-white">
                © {{ date }} Copyright: SPM G7T4
            </p>
        </div>
    </div>
</footer>
</template>

<script>
export default {
    name: "BottomBar",
    data() {
        return {
            fullView: true,
            dropdownClass: "dropdown-content",
            dropdownShown: false,
            views: ["Learning Journey", "Skills", "Roles", "Courses"],
            date: new Date().getFullYear(),
        };
    },
    computed: {
        // Current route I guess. Can use to dynamically render navbar active links
        view() {
            return this.$route.name;
        },

        // return all routes from router
        routes() {
            return this.$router.options.routes;
        },
    },
};
</script>

<style>
.footer-bg-wrapper {
    background-color: transparent;
    height: 100%;
    width: 100%;
    margin: auto;
}

@media screen and (min-width: 230px) {
    .footer-bg-wrapper {
        width: 75%;
    }
}

@media screen and (min-width: 468px) {
    .footer-bg-wrapper {
        width: 75%;
    }
}
</style>
