<script setup>
import { listen } from "majra-core";
import { usePagination } from "./../composables/usePagination";

const { paginate } = usePagination();

listen("pageChanged", (page) => {
  paginate(page);
});
</script>
