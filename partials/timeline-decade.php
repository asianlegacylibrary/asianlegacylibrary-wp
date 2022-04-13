<?php
    $additional_classes     = get_sub_field('additional_classes');
    $decade_title           = get_sub_field('decade_title');
    $decade_description     = get_sub_field('decade_description');
?>
<section class="decade <?php echo $additional_classes; ?>">
    <div class="holder">
        <h3><?php echo $decade_title; ?></h3>
        <article>
            <?php echo $decade_description; ?>
        </article>
    </div>
    <div class="clipper"></div>
</section>